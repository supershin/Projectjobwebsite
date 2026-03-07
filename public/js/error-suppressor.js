// ========================================
// Global Error Suppressor for Figma Iframe
// ========================================
// This script suppresses IframeMessageAbortError from Figma's iframe messaging system
// Add this script to the <head> of all HTML files

(function() {
    'use strict';
    
    // Store original console methods
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalLog = console.log;
    
    // List of error patterns to suppress
    const suppressPatterns = [
        'IframeMessageAbortError',
        'message port was destroyed',
        'Message aborted',
        'AbortError',
        'setupMessageChannel',
        'webpack-artifacts',
        'figma.com/webpack',
        'cleanup',
        'eS.setupMessageChannel',
        'message port',
        'port was destroyed'
    ];
    
    // Check if message should be suppressed
    function shouldSuppressMessage(msg) {
        const message = String(msg || '').toLowerCase();
        return suppressPatterns.some(pattern => 
            message.includes(pattern.toLowerCase())
        );
    }
    
    // Override console.error to suppress Figma iframe errors
    console.error = function(...args) {
        const errorMsg = args.join(' ').toString();
        
        if (shouldSuppressMessage(errorMsg)) {
            return; // Silently return
        }
        
        originalError.apply(console, args);
    };
    
    // Override console.warn to suppress related warnings
    console.warn = function(...args) {
        const warnMsg = args.join(' ').toString();
        
        if (shouldSuppressMessage(warnMsg)) {
            return;
        }
        
        originalWarn.apply(console, args);
    };
    
    // Override console.log to suppress related logs
    console.log = function(...args) {
        const logMsg = args.join(' ').toString();
        
        if (shouldSuppressMessage(logMsg)) {
            return;
        }
        
        originalLog.apply(console, args);
    };
    
    // Global error event handler - capture phase (most aggressive)
    window.addEventListener('error', function(e) {
        const errorMessage = (e.message || e.error?.message || '').toLowerCase();
        const errorStack = (e.error?.stack || '').toLowerCase();
        const errorName = (e.error?.name || '').toLowerCase();
        
        if (shouldSuppressMessage(errorMessage) ||
            shouldSuppressMessage(errorStack) ||
            shouldSuppressMessage(errorName) ||
            errorName === 'aborterror') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return true;
        }
    }, true);
    
    // Global error event handler - bubble phase
    window.addEventListener('error', function(e) {
        const errorMessage = (e.message || e.error?.message || '').toLowerCase();
        const errorStack = (e.error?.stack || '').toLowerCase();
        
        if (shouldSuppressMessage(errorMessage) ||
            shouldSuppressMessage(errorStack)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return true;
        }
    }, false);
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(e) {
        const reason = e.reason || {};
        const reasonMessage = (reason.message || reason.toString() || '').toLowerCase();
        const reasonStack = (reason.stack || '').toLowerCase();
        const reasonName = (reason.name || '').toLowerCase();
        
        if (shouldSuppressMessage(reasonMessage) ||
            shouldSuppressMessage(reasonStack) ||
            shouldSuppressMessage(reasonName) ||
            reasonName === 'aborterror') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return true;
        }
    }, true);
    
    // Override window.onerror
    const originalOnError = window.onerror;
    window.onerror = function(message, source, lineno, colno, error) {
        const msg = (message || '').toLowerCase();
        const src = (source || '').toLowerCase();
        const err = (error?.message || '').toLowerCase();
        const errStack = (error?.stack || '').toLowerCase();
        
        if (shouldSuppressMessage(msg) ||
            shouldSuppressMessage(src) ||
            shouldSuppressMessage(err) ||
            shouldSuppressMessage(errStack)) {
            return true; // Prevent default error handling
        }
        
        if (originalOnError) {
            return originalOnError.call(this, message, source, lineno, colno, error);
        }
        
        return false;
    };
    
    // Monkey patch Error constructor to catch at creation time
    const OriginalError = Error;
    window.Error = function(...args) {
        const error = new OriginalError(...args);
        const msg = (error.message || '').toLowerCase();
        
        if (shouldSuppressMessage(msg)) {
            // Return a dummy error that won't be logged
            const dummyError = new OriginalError('');
            dummyError.stack = '';
            return dummyError;
        }
        
        return error;
    };
    window.Error.prototype = OriginalError.prototype;
    
    // Intercept MessagePort errors if available
    if (typeof MessagePort !== 'undefined') {
        const originalMessagePortStart = MessagePort.prototype.start;
        const originalMessagePortClose = MessagePort.prototype.close;
        
        MessagePort.prototype.start = function() {
            try {
                return originalMessagePortStart.call(this);
            } catch (e) {
                if (shouldSuppressMessage(e.message || '')) {
                    return;
                }
                throw e;
            }
        };
        
        MessagePort.prototype.close = function() {
            try {
                return originalMessagePortClose.call(this);
            } catch (e) {
                if (shouldSuppressMessage(e.message || '')) {
                    return;
                }
                throw e;
            }
        };
    }
    
    // Debug log (commented out for production)
    // originalLog('%c[Error Suppressor] Figma iframe error handler loaded', 'color: #10b981; font-weight: bold;');
})();