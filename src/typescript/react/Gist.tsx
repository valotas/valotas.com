import { h, Component } from 'preact';
import { GistDescription } from '../types';
import { GistStore } from '../content/GistStore';
import { isPromise } from '../utils';
import { Link } from './Link';
import { Icon } from './Icon';
import { Code } from './Code';
import { FormattedCode } from './FormattedCode';

interface GistProps extends GistDescription {

}

interface GistState {
  content: string;
  language?: string;
}

export class Gist extends Component<GistProps, GistState> {
  private contentPromise: Promise<string>;

  constructor(props, context) {
    super(props, context);

    this.state = {
      content: null
    };

    const { gistStore } = this.context;
    if (!gistStore) {
      return;
    }
    const content = gistStore.load(this.props);

    if (isPromise(content)) {
      this.contentPromise = content;
    } else {
      this.state = createState(content, this.props);
    }
  }

  componentDidMount() {
    if (!this.contentPromise) {
      return;
    }
    this.contentPromise.then(content => {
      this.setState(createState(content, this.props));
    });
  }

  render({ user = 'valotas', file, gistId }, { content, language }) {
    const filetarget = file.replace(/\./g, '-').toLocaleLowerCase();
    const href = `https://gist.github.com/${user}/${gistId}#file-${filetarget}`;
    return (
      <Code data-gist-id={gistId} data-gist-user={user} data-gist-file={file}>
        <Link href={href} target='_blank'>
          <Icon name='fa-github' />&nbsp;
          {file}
        </Link>
        <FormattedCode language={language} code={content} />
      </Code>
    );
  }
}

function createState(content, { file }): GistState {
  return {
    content: content.replace(/\t/g, '  '),
    language: lang(file)
  };
}

function lang(file: string) {
  if (file && file.indexOf('.js') > 0) {
    return 'javascript';
  }
  if (file && file.indexOf('.java') > 0) {
    return 'java';
  }
}
