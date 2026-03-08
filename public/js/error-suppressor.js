// ========================================
// Global Error Suppressor for Figma Iframe
// ========================================
// This script suppresses IframeMessageAbortError from Figma's iframe messaging system
// Add this script to the <head> of all HTML files - MUST BE FIRST!

(function() {
    'use strict';
    
    // ========================================
    // IMMEDIATE SUPPRESSION - Execute ASAP
    // ========================================
    
    // Store original console methods IMMEDIATELY
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalLog = console.log;
    
    // Comprehensive list of error patterns to suppress
    const suppressPatterns = [
        'iframemessageaborterror',
        'message port was destroyed',
        'message aborted',
        'aborterror',
        'setupmessagechannel',
        'webpack-artifacts',
        'figma.com/webpack',
        'cleanup',
        'message port',
        'port was destroyed',
        'a.cleanup',
        'o.cleanup',
        'e.onload',
        'es.setupmessagechannel',
        '6005-316f94e648742cad',
        'figma_app-617144028f0d9b4f',
        '316f94e648742cad.min.js',
        '617144028f0d9b4f.min.js',
        'www.figma.com/webpack-artifacts',
        '.min.js.br',
        'message channel',
        'port.close',
        'port.start',
        'port.postmessage',
        'messagechannel',
        'messageport',
        'figma iframe',
        'figma_app',
        'onmessageerror',
        'channel.port',
        'destroyed',
        'aborted',
        'message aborted: message port was destroyed',
        'assets/6005-316f94e648742cad',
        'assets/figma_app-617144028f0d9b4f',
        'at a.cleanup',
        'at o.cleanup',
        'at es.setupmessagechannel',
        'at e.onload'
    ];
    
    // Additional exact match patterns (case-sensitive)
    const exactMatchPatterns = [
        'IframeMessageAbortError',
        'eS.setupMessageChannel',
        'a.cleanup',
        'o.cleanup',
        'e.onload',
        'Message aborted: message port was destroyed',
        '6005-316f94e648742cad.min.js.br',
        'figma_app-617144028f0d9b4f.min.js.br'
    ];
    
    // Ultra-fast check function
    function shouldSuppress(msg) {
        if (!msg) return false;
        const str = String(msg);
        
        // Check exact matches first (case-sensitive for Figma errors)
        for (let i = 0; i < exactMatchPatterns.length; i++) {
            if (str.includes(exactMatchPatterns[i])) {
                return true;
            }
        }
        
        const lowerStr = str.toLowerCase();
        // Quick check for most common patterns first
        if (lowerStr.includes('iframemessageaborterror') || 
            lowerStr.includes('message port') || 
            lowerStr.includes('figma.com') ||
            lowerStr.includes('webpack-artifacts') ||
            lowerStr.includes('message aborted')) {
            return true;
        }
        // Full pattern check
        for (let i = 0; i < suppressPatterns.length; i++) {
            if (lowerStr.includes(suppressPatterns[i])) {
                return true;
            }
        }
        return false;
    }
    
    // Check error object comprehensively
    function isSuppressedError(error) {
        if (!error) return false;
        
        // Check all error properties
        if (error.name && shouldSuppress(error.name)) return true;
        if (error.message && shouldSuppress(error.message)) return true;
        if (error.stack && shouldSuppress(error.stack)) return true;
        if (error.toString && shouldSuppress(error.toString())) return true;
        
        // Check constructor name
        if (error.constructor && error.constructor.name && 
            shouldSuppress(error.constructor.name)) return true;
        
        return false;
    }
    
    // ========================================
    // CONSOLE OVERRIDES - Immediate
    // ========================================
    
    console.error = function(...args) {
        // Fast check - iterate through all arguments
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (shouldSuppress(arg) || isSuppressedError(arg)) {
                return; // Completely suppress
            }
        }
        originalError.apply(console, args);
    };
    
    console.warn = function(...args) {
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (shouldSuppress(arg) || isSuppressedError(arg)) {
                return;
            }
        }
        originalWarn.apply(console, args);
    };
    
    console.log = function(...args) {
        for (let i = 0; i < args.length; i++) {
            if (shouldSuppress(args[i])) {
                return;
            }
        }
        originalLog.apply(console, args);
    };
    
    // ========================================
    // GLOBAL ERROR HANDLERS - Capture Phase (Highest Priority)
    // ========================================
    
    window.addEventListener('error', function(event) {
        try {
            const msg = event.message || '';
            const filename = event.filename || '';
            const error = event.error;
            
            if (shouldSuppress(msg) || 
                shouldSuppress(filename) || 
                isSuppressedError(error) ||
                (filename && filename.includes('figma.com'))) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                return true;
            }
        } catch (e) {
            // Ignore meta-errors
        }
    }, true); // Capture phase - CRITICAL!
    
    // ========================================
    // UNHANDLED REJECTION HANDLER - Immediate
    // ========================================
    
    window.addEventListener('unhandledrejection', function(event) {
        try {
            const reason = event.reason;
            if (isSuppressedError(reason) || shouldSuppress(String(reason))) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                return true;
            }
        } catch (e) {
            // Ignore meta-errors
        }
    }, true); // Capture phase
    
    // ========================================
    // WINDOW.ONERROR OVERRIDE - Immediate
    // ========================================
    
    const originalOnError = window.onerror;
    window.onerror = function(message, source, lineno, colno, error) {
        if (shouldSuppress(message) || 
            shouldSuppress(source) || 
            isSuppressedError(error)) {
            return true; // Suppress
        }
        
        if (originalOnError) {
            return originalOnError.call(this, message, source, lineno, colno, error);
        }
        return false;
    };
    
    // ========================================
    // ERROR CONSTRUCTOR OVERRIDE
    // ========================================
    
    const OriginalError = window.Error;
    window.Error = function(...args) {
        const error = new OriginalError(...args);
        
        // If error message should be suppressed, neuter it
        if (shouldSuppress(error.message || '')) {
            error.message = '';
            error.stack = '';
            error.name = 'SuppressedError';
        }
        
        return error;
    };
    window.Error.prototype = OriginalError.prototype;
    if (OriginalError.captureStackTrace) {
        window.Error.captureStackTrace = OriginalError.captureStackTrace;
    }
    
    // ========================================
    // MESSAGEPORT & MESSAGECHANNEL PROTECTION
    // ========================================
    
    if (typeof MessagePort !== 'undefined') {
        const safeWrap = (proto, method) => {
            const original = proto[method];
            if (!original) return;
            
            proto[method] = function(...args) {
                try {
                    return original.apply(this, args);
                } catch (e) {
                    if (shouldSuppress(e.message || '') || isSuppressedError(e)) {
                        return; // Silently suppress
                    }
                    throw e;
                }
            };
        };
        
        safeWrap(MessagePort.prototype, 'start');
        safeWrap(MessagePort.prototype, 'close');
        safeWrap(MessagePort.prototype, 'postMessage');
        
        // Suppress messageerror events
        const originalAddEventListener = MessagePort.prototype.addEventListener;
        MessagePort.prototype.addEventListener = function(type, listener, options) {
            if (type === 'messageerror') {
                const wrappedListener = function(e) {
                    if (isSuppressedError(e) || shouldSuppress(e.message || '')) {
                        return; // Suppress
                    }
                    listener.call(this, e);
                };
                return originalAddEventListener.call(this, type, wrappedListener, options);
            }
            return originalAddEventListener.call(this, type, listener, options);
        };
    }
    
    // ========================================
    // ASYNC OPERATIONS PROTECTION
    // ========================================
    
    // Wrap setTimeout
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = function(fn, delay, ...args) {
        const wrapped = function() {
            try {
                return fn.apply(this, arguments);
            } catch (e) {
                if (!isSuppressedError(e) && !shouldSuppress(e.message || '')) {
                    throw e;
                }
            }
        };
        return originalSetTimeout.call(window, wrapped, delay, ...args);
    };
    
    // Wrap setInterval
    const originalSetInterval = window.setInterval;
    window.setInterval = function(fn, delay, ...args) {
        const wrapped = function() {
            try {
                return fn.apply(this, arguments);
            } catch (e) {
                if (!isSuppressedError(e) && !shouldSuppress(e.message || '')) {
                    throw e;
                }
            }
        };
        return originalSetInterval.call(window, wrapped, delay, ...args);
    };
    
    // Wrap requestAnimationFrame
    if (window.requestAnimationFrame) {
        const originalRAF = window.requestAnimationFrame;
        window.requestAnimationFrame = function(callback) {
            const wrapped = function(timestamp) {
                try {
                    return callback.call(this, timestamp);
                } catch (e) {
                    if (!isSuppressedError(e) && !shouldSuppress(e.message || '')) {
                        throw e;
                    }
                }
            };
            return originalRAF.call(window, wrapped);
        };
    }
    
    // ========================================
    // PROMISE PROTECTION
    // ========================================
    
    const originalPromiseCatch = Promise.prototype.catch;
    Promise.prototype.catch = function(onRejected) {
        const wrapped = function(reason) {
            if (isSuppressedError(reason) || shouldSuppress(String(reason.message || reason || ''))) {
                return Promise.resolve(); // Silently resolve
            }
            if (onRejected) {
                return onRejected.call(this, reason);
            }
            throw reason;
        };
        return originalPromiseCatch.call(this, wrapped);
    };
    
    const originalPromiseThen = Promise.prototype.then;
    Promise.prototype.then = function(onFulfilled, onRejected) {
        const wrappedRejection = onRejected ? function(reason) {
            if (isSuppressedError(reason) || shouldSuppress(String(reason.message || reason || ''))) {
                return Promise.resolve();
            }
            return onRejected.call(this, reason);
        } : function(reason) {
            if (isSuppressedError(reason) || shouldSuppress(String(reason.message || reason || ''))) {
                return Promise.resolve();
            }
            throw reason;
        };
        return originalPromiseThen.call(this, onFulfilled, wrappedRejection);
    };
    
    // ========================================
    // ERROR.PROTOTYPE MODIFICATIONS
    // ========================================
    
    // Override toString
    const originalToString = Error.prototype.toString;
    Error.prototype.toString = function() {
        if (isSuppressedError(this) || shouldSuppress(this.message || '')) {
            return ''; // Return empty
        }
        return originalToString.call(this);
    };
    
    // Override stack getter if possible
    try {
        const stackDescriptor = Object.getOwnPropertyDescriptor(Error.prototype, 'stack');
        if (stackDescriptor && stackDescriptor.get) {
            Object.defineProperty(Error.prototype, 'stack', {
                get: function() {
                    const stack = stackDescriptor.get.call(this);
                    if (shouldSuppress(stack || '')) {
                        return ''; // Return empty stack
                    }
                    return stack;
                },
                set: stackDescriptor.set,
                configurable: true
            });
        }
    } catch (e) {
        // Ignore if can't modify
    }
    
    // ========================================
    // IFRAME MONITORING - Prevent iframe errors from bubbling
    // ========================================
    
    // Monitor for iframe creation and attach error handlers
    const monitorIframes = () => {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            try {
                // Mark as processed
                if (iframe.dataset.errorSuppressed) return;
                iframe.dataset.errorSuppressed = 'true';
                
                // Add error handler
                iframe.addEventListener('error', function(e) {
                    if (shouldSuppress(e.message || '') || 
                        (iframe.src && iframe.src.includes('figma.com'))) {
                        e.preventDefault();
                        e.stopPropagation();
                        return true;
                    }
                }, true);
            } catch (e) {
                // Ignore cross-origin errors
            }
        });
    };
    
    // Monitor on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', monitorIframes);
    } else {
        monitorIframes();
    }
    
    // Monitor for dynamically added iframes
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.tagName === 'IFRAME') {
                        monitorIframes();
                    }
                });
            });
        });
        
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }
    
    // ========================================
    // FINAL FALLBACK - Global try-catch wrapper
    // ========================================
    
    // Wrap the entire window in a try-catch at the lowest level possible
    const originalWindowPrototypeToString = Window.prototype.toString;
    Window.prototype.toString = function() {
        try {
            return originalWindowPrototypeToString.call(this);
        } catch (e) {
            if (isSuppressedError(e)) return '';
            throw e;
        }
    };
    
    // Success log (optional - comment out for production)
    // originalLog('%c✓ Enhanced Figma Error Suppressor Active', 'color: #10b981; font-weight: bold; font-size: 12px;');
    
})();

// ========================================
// ADDITIONAL PROTECTION - Execute immediately after script
// ========================================

// Add a secondary capture to ensure we catch everything
(function() {
    const suppress = (str) => {
        if (!str) return false;
        const s = String(str).toLowerCase();
        return s.includes('iframemessageaborterror') || 
               s.includes('message port') || 
               s.includes('figma.com') ||
               s.includes('message aborted');
    };
    
    // Final error event listener with highest priority
    window.addEventListener('error', (e) => {
        if (suppress(e.message) || suppress(e.filename) || 
            (e.error && (suppress(e.error.message) || suppress(e.error.stack)))) {
            e.stopImmediatePropagation();
            e.preventDefault();
            return true;
        }
    }, true);
    
    // Final unhandledrejection listener
    window.addEventListener('unhandledrejection', (e) => {
        const r = e.reason;
        if (suppress(r) || (r && (suppress(r.message) || suppress(r.stack)))) {
            e.stopImmediatePropagation();
            e.preventDefault();
            return true;
        }
    }, true);
})();