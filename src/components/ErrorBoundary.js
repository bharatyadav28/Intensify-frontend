import { Component } from "react";

import ErrorPage from "../pages/ErrorPage";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false, error: null };
  }
  componentDidCatch(error) {
    // console.log("error", error);
    this.setState({ hasError: true });
    this.setState({ error: error });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage err={this.state.error} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
