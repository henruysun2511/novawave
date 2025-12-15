export { };

declare global {
  interface Window {
    PayOSCheckout?: {
      open: (config: {
        checkoutUrl: string;
        onSuccess?: (data: any) => void;
        onCancel?: () => void;
        onExit?: () => void;
      }) => void;
    };
  }
}