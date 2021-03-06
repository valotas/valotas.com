import { Article } from '../content/Article';
import { h, Component } from 'preact';
import { Icon } from './Icon';
import { Link } from './Link';
import { Header } from './Header';
import { VALOTAS } from '../utils';
import { MetaFileStore } from '../content/MetaFileStore';
import { loadTwitter } from '../browser/Twitter';
import { MarkedComponent } from './MarkedComponent';

interface ArticleProps {
  article?: Article;
  metafileStore: MetaFileStore;
}

export function ArticleWithHeaderComponent({
  article,
  metafileStore
}: ArticleProps) {
  return (
    <div>
      <Header
        title={article.title}
        subtitle={VALOTAS}
        date={article.date('DD/MM/YYYY')}
        metafileStore={metafileStore}
      />
      <ArticleComponent article={article} metafileStore={metafileStore} />
    </div>
  );
}

export class ArticleComponent extends Component<ArticleProps, {}> {
  render({ article, metafileStore }) {
    if (!article) {
      return null;
    }
    return (
      <div className="container main">
        <div className="article text-justify">
          <MarkedComponent meta={article.meta} />
        </div>
        <div className="actions button-group">
          <Link className="button" metafileStore={metafileStore}>
            <Icon name="fa-home" size="sm-2x" />
            <span className="text">&nbsp;Home</span>
          </Link>
          <Link href="#" className="button">
            <span className="text">Top&nbsp;</span>
            <Icon name="fa-toggle-up" size="sm-2x" />
          </Link>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this._loadTwitterWidgets();
  }

  private _loadTwitterWidgets() {
    if (!this.props.article.hasTweets()) {
      return;
    }
    loadTwitter().then(twttr => {
      twttr.widgets.load();
    });
  }

  componentDidUpdate() {
    this._loadTwitterWidgets();
  }
}
