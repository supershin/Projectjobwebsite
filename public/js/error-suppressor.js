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
    
    // Override console.error to suppress Figma iframe errors
    console.error = function(...args) {
        const errorMsg = args.join(' ').toString();
        
        // List of error messages to suppress
        const suppressPatterns = [
            'IframeMessageAbortError',
            'message port was destroyed',
            'Message aborted',
            'AbortError',
            'setupMessageChannel',
            'webpack-artifacts'
        ];
        
        // Check if error message contains any suppress pattern
        const shouldSuppress = suppressPatterns.some(pattern => 
            errorMsg.toLowerCase().includes(pattern.toLowerCase())
        );
        
        if (shouldSuppress) {
            // Silently return without logging
            return;
        }
        
        // Log other errors normally
        originalError.apply(console, args);
    };
    
    // Override console.warn to suppress related warnings
    console.warn = function(...args) {
        const warnMsg = args.join(' ').toString();
        
        if (warnMsg.includes('IframeMessageAbortError') || 
            warnMsg.includes('message port was destroyed')) {
            return;
        }
        
        originalWarn.apply(console, args);
    };
    
    // Global error event handler - capture phase
    window.addEventListener('error', function(e) {
        const errorMessage = (e.message || e.error?.message || '').toLowerCase();
        const errorStack = (e.error?.stack || '').toLowerCase();
        
        if (errorMessage.includes('iframemessageaborterror') ||
            errorMessage.includes('message port was destroyed') ||
            errorMessage.includes('message aborted') ||
            errorStack.includes('webpack-artifacts') ||
            errorStack.includes('setupmessagechannel')) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }
    }, true);
    
    // Global error event handler - bubble phase
    window.addEventListener('error', function(e) {
        const errorMessage = (e.message || e.error?.message || '').toLowerCase();
        const errorStack = (e.error?.stack || '').toLowerCase();
        
        if (errorMessage.includes('iframemessageaborterror') ||
            errorMessage.includes('message port was destroyed') ||
            errorMessage.includes('message aborted') ||
            errorStack.includes('webpack-artifacts') ||
            errorStack.includes('setupmessagechannel')) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }
    }, false);
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(e) {
        const reason = e.reason || {};
        const reasonMessage = (reason.message || reason.toString() || '').toLowerCase();
        const reasonStack = (reason.stack || '').toLowerCase();
        
        if (reasonMessage.includes('iframemessageaborterror') ||
            reasonMessage.includes('message port was destroyed') ||
            reasonMessage.includes('message aborted') ||
            reasonStack.includes('webpack-artifacts') ||
            reasonStack.includes('setupmessagechannel')) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }
    });
    
    // Override window.onerror
    const originalOnError = window.onerror;
    window.onerror = function(message, source, lineno, colno, error) {
        const msg = (message || '').toLowerCase();
        const src = (source || '').toLowerCase();
        const err = (error?.message || '').toLowerCase();
        
        if (msg.includes('iframemessageaborterror') ||
            msg.includes('message port was destroyed') ||
            msg.includes('message aborted') ||
            src.includes('webpack-artifacts') ||
            src.includes('figma.com') ||
            err.includes('iframemessageaborterror')) {
            return true; // Prevent default error handling
        }
        
        if (originalOnError) {
            return originalOnError.call(this, message, source, lineno, colno, error);
        }
        
        return false;
    };
    
    // Debug log (commented out for production)
    // console.log('%c[Error Suppressor] Figma iframe error handler loaded', 'color: #10b981; font-weight: bold;');
})();