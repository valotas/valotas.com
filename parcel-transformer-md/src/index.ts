import {Transformer} from '@parcel/plugin';

export default new Transformer({
  async transform({asset, config}) {
    // do nothing, just return the asset
    return [asset];
  }
});
