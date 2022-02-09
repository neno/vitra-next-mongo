import { Component, ReactNode } from 'react';

type TErrorBoundaryProps = {
  fallback: any;
};

type TErrorBoundaryState = {
  hasError: boolean;
  error: string | null;
};

export class ErrorBoundary extends Component<
  TErrorBoundaryProps,
  TErrorBoundaryState
> {
  state: TErrorBoundaryState = { hasError: false, error: null };
  static getDerivedStateFromError(error: string) {
    return {
      hasError: true,
      error,
    };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
