import { h, Component } from 'preact';
import { GistStore } from '../content/GistStore';
import { isPromise } from '../utils';
import { Link } from './Link';
import { Icon } from './Icon';
import { Code } from './Code';

interface GistProps extends GistDescription {

}

interface GistState {
  content: string;
}

export class Gist extends Component<GistProps, GistState> {
  private contentPromise: Promise<string>;

  context: {
    gistStore: GistStore
  };

  /*static contextTypes: React.ValidationMap<any> = {
    gistStore: React.PropTypes.object
  };*/

  constructor(props, context) {
    super(props);

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
      this.state = { content: content.replace(/\t/g, '  ') };
    }
  }

  componentDidMount() {
    if (!this.contentPromise) {
      return;
    }
    this.contentPromise.then((content) => {
      this.setState({
        content: content.replace(/\t/g, '  ')
      });
    });
  }

  render() {
    const { user = 'valotas', file, gistId } = this.props;
    const filetarget = file.replace(/\./g, '-').toLocaleLowerCase();
    const href = `https://gist.github.com/${user}/${gistId}#file-${filetarget}`;
    return (
      <Code data-gist-id={gistId} data-gist-user={user} data-gist-file={file}>
        <Link href={href} target='_blank'>
          <Icon name='fa-github' />&nbsp;
          {file}
        </Link>
        <code>{this.state.content}</code>
      </Code>
    );
  }
}
