import { Component, h } from 'preact';
import { MetaFileStore } from '../content/MetaFileStore';
import { Icon } from './Icon';
import { BROWSER } from '../browser/Browser';

interface LinkProps {
  article?: Article;
  href?: string;
  metafileStore?: MetaFileStore;
  className?: string;
  target?: string;
}

export class Link extends Component<LinkProps, any> {
  context: {
    metafileStore: MetaFileStore
  };

/*  static contextTypes: = {
    metafileStore: React.PropTypes.object
  };*/

  handleClick = (e) => {
    const { href, target } = this.props;
    if (href === '#') {
      e.preventDefault();
      window.scrollTo(0, 0);
      return;
    }

    if (!BROWSER.browserSupported) {
      return;
    }

    if (target === '_blank' || (href && href.indexOf('http') === 0)) {
      return;
    }

    const store = this.props.metafileStore || this.context.metafileStore;
    if (!store) {
      return;
    }

    e.preventDefault();
    store.load(this.props.article || this.props.href || '/');
  }

  render(props) {
    const href = props.href || this.createHref();
    return <a href={href} className={props.className} onClick={this.handleClick} target={props.target}>{props.children}</a>;
  }
  createHref() {
    let href = '/';
    const article = this.props.article;
    if (article) {
      href += `${article.key}/`;
    }
    return href;
  }
}
