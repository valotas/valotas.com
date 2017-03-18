import { h } from 'preact';
import { createArticle } from '../content/Article';
import { MetaFile } from '../content/MetaFile';
import { ArticleWithHeaderComponent } from './ArticleComponent';
import { IndexWithHeader } from './Index';
import { ErrorWithHeader } from './Error';
import { isArray } from '../utils';

interface LayoutMainContentProps {
  meta: MetaFile | MetaFile[];
}

export function LayoutMainContent({ meta }: LayoutMainContentProps, { metafileStore }) {
  if (isArray(meta)) {
    const articles = toArticles(meta);
    return <IndexWithHeader articles={articles} metafileStore={metafileStore} />;
  }

  if (meta && meta.type === 'article') {
    const article = createArticle(meta as MetaFile);
    return <ArticleWithHeaderComponent article={article} metafileStore={metafileStore} />;
  }

  return <ErrorWithHeader />;
}


function toArticles(arr: MetaFile[]): Article[] {
  return arr.map((input) => createArticle(input));
}
