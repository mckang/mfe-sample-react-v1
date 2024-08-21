import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트합니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로깅 서비스에 에러를 기록할 수도 있습니다.
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 렌더링합니다.
      return <h1>서비스 준비 중입니다....</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;