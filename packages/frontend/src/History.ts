class History {
  onPushState(handler: (e: any) => void) {
    document.addEventListener("pushstate", handler);
    window.addEventListener("popstate", handler);

    return () => {
      window.removeEventListener("popstate", handler);
      document.removeEventListener("pushstate", handler);
    };
  }

  pushState(payload: string, title: string | undefined, href?: string) {
    href = href || location.pathname;
    const pathUpdate = href !== location.pathname;

    window.history.pushState(payload, title || document.title, href);

    if (!pathUpdate) {
      return;
    }

    // if the given href is different than the current pathname
    // fire a change event
    document.dispatchEvent(
      new CustomEvent("pushstate", {
        detail: {
          state: payload,
        },
      })
    );
  }
}

let instance: History | null = null;

export function history(): History {
  instance = instance || new History();
  return instance;
}
