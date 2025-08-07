// Global type declarations

interface Document {
	startViewTransition?: (callback: () => void | Promise<void>) => {
		ready: Promise<void>;
		updateCallbackDone: Promise<void>;
		finished: Promise<void>;
		skipTransition: () => void;
	};
}
