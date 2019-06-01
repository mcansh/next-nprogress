import React from 'react';
import NProgress, { NProgressOptions } from 'nprogress';
import Router from 'next/router';
import { createGlobalStyle, keyframes } from 'styled-components';

interface Props {
  showAfterMs?: number;
  options?: Partial<NProgressOptions>;
  color?: string;
  spinner?: boolean;
  children?: never;
}

const Spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Progress = createGlobalStyle<Props>`
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: ${props => props.color};
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px ${props => props.color}, 0 0 5px ${props =>
  props.color};
    opacity: 1;
    transform: rotate(3deg) translate(0px, -4px);
  }

  #nprogress .spinner {
    display: ${props => (props.spinner ? 'block' : 'none')};
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border: solid 2px transparent;
    border-top-color: ${props => props.color};
    border-left-color: ${props => props.color};
    border-radius: 50%;
    animation: ${Spinner} 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }
`;

class NProgressContainer extends React.Component<Props> {
  static defaultProps = {
    color: '#2299DD',
    showAfterMs: 300,
    spinner: true,
  };

  timer: any = null;

  componentDidMount() {
    const { options } = this.props;

    if (options) {
      NProgress.configure(options);
    }

    Router.events.on('routeChangeStart', this.routeChangeStart);
    Router.events.on('routeChangeComplete', this.routeChangeEnd);
    Router.events.on('routeChangeError', this.routeChangeEnd);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    Router.events.off('routeChangeStart', this.routeChangeStart);
    Router.events.off('routeChangeComplete', this.routeChangeEnd);
    Router.events.off('routeChangeError', this.routeChangeEnd);
  }

  routeChangeStart = () => {
    const { showAfterMs } = this.props;
    clearTimeout(this.timer);
    this.timer = setTimeout(NProgress.start, showAfterMs);
  };

  routeChangeEnd = () => {
    clearTimeout(this.timer);
    NProgress.done();
  };

  render() {
    const { color, spinner } = this.props;
    return <Progress color={color} spinner={spinner} />;
  }
}

export { NProgressContainer as NProgress };
export { NProgressOptions, NProgress as NProgressInterface } from 'nprogress';
