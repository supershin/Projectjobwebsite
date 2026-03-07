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
        'port was destroyed',
        'a.cleanup',
        'o.cleanup',
        'e.onload',
        '6005-316f94e648742cad',
        'figma_app-617144028f0d9b4f'
    ];
    
    // Check if message should be suppressed
    function shouldSuppressMessage(msg) {
        if (!msg) return false;
        const message = String(msg).toLowerCase();
        return suppressPatterns.some(pattern => 
            message.includes(pattern.toLowerCase())
        );
    }
    
    // Check if error object or stack trace contains Figma patterns
    function isFigmaError(error) {
        if (!error) return false;
        
        // Check error name
        if (error.name && shouldSuppressMessage(error.name)) {
            return true;
        }
        
        // Check error message
        if (error.message && shouldSuppressMessage(error.message)) {
            return true;
        }
        
        // Check stack trace
        if (error.stack) {
            const stack = String(error.stack);
            if (stack.includes('figma.com') || 
                stack.includes('webpack-artifacts') ||
                stack.includes('IframeMessageAbortError') ||
                stack.includes('setupMessageChannel') ||
                stack.includes('message port')) {
                return true;
            }
        }
        
        return false;
    }
    
    // Override console.error to suppress Figma iframe errors
    console.error = function(...args) {
        // Check all arguments
        for (let arg of args) {
            if (shouldSuppressMessage(String(arg)) || isFigmaError(arg)) {
                return; // Silently suppress
            }
        }
        
        originalError.apply(console, args);
    };
    
    // Override console.warn to suppress related warnings
    console.warn = function(...args) {
        for (let arg of args) {
            if (shouldSuppressMessage(String(arg)) || isFigmaError(arg)) {
                return;
            }
        }
        
        originalWarn.apply(console, args);
    };
    
    // Override console.log to suppress related logs
    console.log = function(...args) {
        for (let arg of args) {
            if (shouldSuppressMessage(String(arg))) {
                return;
            }
        }
        
        originalLog.apply(console, args);
    };
    
    // Global error event handler - capture phase (most aggressive)
    window.addEventListener('error', function(e) {
        const errorMessage = (e.message || '').toLowerCase();
        const errorStack = (e.error?.stack || '').toLowerCase();
        const errorName = (e.error?.name || '').toLowerCase();
        const filename = (e.filename || '').toLowerCase();
        
        // Check if it's a Figma-related error
        if (shouldSuppressMessage(errorMessage) ||
            shouldSuppressMessage(errorStack) ||
            shouldSuppressMessage(errorName) ||
            shouldSuppressMessage(filename) ||
            isFigmaError(e.error) ||
            errorName === 'aborterror' ||
            filename.includes('figma.com') ||
            filename.includes('webpack-artifacts')) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return true;
        }
    }, true);
    
    // Global error event handler - bubble phase
    window.addEventListener('error', function(e) {
        const errorMessage = (e.message || '').toLowerCase();
        const errorStack = (e.error?.stack || '').toLowerCase();
        const filename = (e.filename || '').toLowerCase();
        
        if (shouldSuppressMessage(errorMessage) ||
            shouldSuppressMessage(errorStack) ||
            shouldSuppressMessage(filename) ||
            isFigmaError(e.error) ||
            filename.includes('figma.com')) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return true;
        }
    }, false);
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(e) {
        const reason = e.reason || {};
        const reasonMessage = String(reason.message || reason || '').toLowerCase();
        const reasonStack = (reason.stack || '').toLowerCase();
        const reasonName = (reason.name || '').toLowerCase();
        
        if (shouldSuppressMessage(reasonMessage) ||
            shouldSuppressMessage(reasonStack) ||
            shouldSuppressMessage(reasonName) ||
            isFigmaError(reason) ||
            reasonName === 'aborterror' ||
            reasonName === 'iframemessageaborterror') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return true;
        }
    }, true);
    
    // Override window.onerror
    const originalOnError = window.onerror;
    window.onerror = function(message, source, lineno, colno, error) {
        const msg = String(message || '').toLowerCase();
        const src = String(source || '').toLowerCase();
        const err = (error?.message || '').toLowerCase();
        const errStack = (error?.stack || '').toLowerCase();
        
        if (shouldSuppressMessage(msg) ||
            shouldSuppressMessage(src) ||
            shouldSuppressMessage(err) ||
            shouldSuppressMessage(errStack) ||
            isFigmaError(error) ||
            src.includes('figma.com') ||
            src.includes('webpack-artifacts')) {
            return true; // Prevent default error handling
        }
        
        if (originalOnError) {
            return originalOnError.call(this, message, source, lineno, colno, error);
        }
        
        return false;
    };
    
    // Monkey patch Error constructor to catch at creation time
    const OriginalError = window.Error;
    window.Error = function(...args) {
        const error = new OriginalError(...args);
        const msg = String(error.message || '').toLowerCase();
        
        if (shouldSuppressMessage(msg)) {
            // Return a dummy error that won't be logged
            const dummyError = new OriginalError('');
            dummyError.stack = '';
            dummyError.name = 'SuppressedError';
            return dummyError;
        }
        
        return error;
    };
    window.Error.prototype = OriginalError.prototype;
    window.Error.captureStackTrace = OriginalError.captureStackTrace;
    
    // Intercept MessagePort errors if available
    if (typeof MessagePort !== 'undefined') {
        const originalMessagePortStart = MessagePort.prototype.start;
        const originalMessagePortClose = MessagePort.prototype.close;
        const originalMessagePortPostMessage = MessagePort.prototype.postMessage;
        
        MessagePort.prototype.start = function() {
            try {
                return originalMessagePortStart.call(this);
            } catch (e) {
                if (shouldSuppressMessage(e.message || '') || isFigmaError(e)) {
                    return;
                }
                throw e;
            }
        };
        
        MessagePort.prototype.close = function() {
            try {
                return originalMessagePortClose.call(this);
            } catch (e) {
                if (shouldSuppressMessage(e.message || '') || isFigmaError(e)) {
                    return;
                }
                throw e;
            }
        };
        
        MessagePort.prototype.postMessage = function() {
            try {
                return originalMessagePortPostMessage.apply(this, arguments);
            } catch (e) {
                if (shouldSuppressMessage(e.message || '') || isFigmaError(e)) {
                    return;
                }
                throw e;
            }
        };
    }
    
    // Intercept MessageChannel errors
    if (typeof MessageChannel !== 'undefined') {
        const OriginalMessageChannel = MessageChannel;
        window.MessageChannel = function() {
            const channel = new OriginalMessageChannel();
            
            // Wrap port1 and port2 methods
            const wrapPort = (port) => {
                const originalOnMessage = Object.getOwnPropertyDescriptor(MessagePort.prototype, 'onmessage');
                const originalOnMessageError = Object.getOwnPropertyDescriptor(MessagePort.prototype, 'onmessageerror');
                
                // Suppress onmessageerror
                Object.defineProperty(port, 'onmessageerror', {
                    set: function(handler) {
                        const wrappedHandler = function(e) {
                            if (isFigmaError(e) || shouldSuppressMessage(e.message || '')) {
                                return;
                            }
                            if (handler) {
                                handler.call(this, e);
                            }
                        };
                        if (originalOnMessageError && originalOnMessageError.set) {
                            originalOnMessageError.set.call(this, wrappedHandler);
                        }
                    },
                    get: function() {
                        if (originalOnMessageError && originalOnMessageError.get) {
                            return originalOnMessageError.get.call(this);
                        }
                    }
                });
            };
            
            wrapPort(channel.port1);
            wrapPort(channel.port2);
            
            return channel;
        };
    }
    
    // Suppress specific Figma error types
    const originalErrorConstructor = window.Error;
    const suppressedErrorTypes = [
        'IframeMessageAbortError',
        'AbortError'
    ];
    
    // Create custom error class suppressor
    suppressedErrorTypes.forEach(errorType => {
        try {
            Object.defineProperty(window, errorType, {
                value: function(...args) {
                    const err = new originalErrorConstructor(...args);
                    err.name = errorType;
                    // Make it silent
                    err.stack = '';
                    err.message = '';
                    return err;
                },
                writable: true,
                configurable: true
            });
        } catch (e) {
            // Ignore if property can't be defined
        }
    });
    
    // Debug log (commented out for production)
    // originalLog('%c[Error Suppressor] Enhanced Figma iframe error handler loaded', 'color: #10b981; font-weight: bold;');
})();