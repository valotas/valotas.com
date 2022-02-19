import { PageState } from "../PageState";
import { Bus } from "../Bus";

export class HistoryService {
  private popStateBus: Bus<PageState> = new Bus();
  private pushStateBus: Bus<PageState> = new Bus();

  constructor(private win: Window) {
    win.addEventListener("popstate", (ev: PopStateEvent) => {
      const page = ev.state as PageState;
      this.popStateBus.notify(page);
    });
  }

  pushState(page: PageState) {
    this.win.history.pushState(page, page.title, page.path);
    this.pushStateBus.notify(page);
  }

  onPushState(listener: (PageState) => void) {
    return this.pushStateBus.register(listener);
  }

  onPopState(listener: (PageState) => void) {
    return this.popStateBus.register(listener);
  }
}
