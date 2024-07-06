import { act, render } from "@testing-library/react";
import { jest } from "@jest/globals";

jest.unstable_mockModule("./History", () => {
  const history = jest.fn();
  return { history };
});
const history = await import("./History.js");
const { PageRenderer } = await import("./PageRenderer.js");

describe("PageRenderer", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    jest.mocked(history.history).mockImplementation(
      () =>
        ({
          onPushState: jest.fn(),
          pushState: jest.fn(),
        }) as any,
    );
  });

  it("exists", async () => {
    expect(PageRenderer).toBeDefined();
  });

  it("renders a page when only props is given", async () => {
    const props = { bodyMarkdown: "the body", title: "title" };
    const { container } = await render(<PageRenderer props={props} />);

    const title = container.querySelector("h1");
    expect(title?.innerHTML).toBe("title");
  });

  it("sets document.title", async () => {
    const props = { bodyMarkdown: "the body", title: "title" };
    await render(<PageRenderer props={props} />);

    expect(document.title).toBe("title");
  });

  it("renders a page when a payload is given", async () => {
    const props = { bodyMarkdown: "the body", title: "payload title" };
    const { container } = await render(
      <PageRenderer payload={JSON.stringify(props)} />,
    );

    const title = container.querySelector("h1");
    expect(title?.innerHTML).toBe("payload title");
  });

  describe("on history change", () => {
    let handler: any;
    let scroll: jest.SpiedFunction<any>;

    beforeEach(() => {
      scroll = jest
        .spyOn(window, "scrollTo")
        .mockReturnValue() as jest.SpiedFunction<any>;
      jest.mocked(history.history).mockImplementation(
        () =>
          ({
            onPushState: (h: any) => {
              handler = h;
              return jest.fn();
            },
            pushState: jest.fn(),
          }) as any,
      );
    });

    it("re-renders onPushState with state", async () => {
      const newProps = { bodyMarkdown: "the body2", title: "title2" };
      const { container } = await render(
        <PageRenderer
          payload={JSON.stringify({
            bodyMarkdown: "the body",
            title: "initial title",
          })}
        />,
      );

      act(() => handler({ state: JSON.stringify(newProps) }));

      const title = container.querySelector("h1");
      expect(title?.innerHTML).toBe("title2");
    });

    it("re-renders onPushState with detail.state", async () => {
      const newProps = { bodyMarkdown: "the body2", title: "title2" };
      const { container } = await render(
        <PageRenderer
          payload={JSON.stringify({ bodyMarkdown: "", title: "initial title" })}
        />,
      );

      act(() => handler({ detail: { state: JSON.stringify(newProps) } }));

      const title = container.querySelector("h1");
      expect(title?.innerHTML).toBe("title2");
    });

    it("updates the document.title", async () => {
      const newProps = { bodyMarkdown: "the body2", title: "title2" };
      await render(
        <PageRenderer
          payload={JSON.stringify({
            bodyMarkdown: "the body",
            title: "initial title",
          })}
        />,
      );

      act(() => handler({ state: JSON.stringify(newProps) }));

      expect(document.title).toBe("title2");
    });

    it("scrolls to the top on new detail.state", async () => {
      const newProps = { bodyMarkdown: "the body2", title: "title2" };
      await render(
        <PageRenderer
          payload={JSON.stringify({
            bodyMarkdown: "the body",
            title: "initial title",
          })}
        />,
      );

      act(() => handler({ detail: { state: JSON.stringify(newProps) } }));

      expect(scroll).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    });

    it("does not scroll when only state is given", async () => {
      const newProps = { bodyMarkdown: "the body2", title: "title2" };
      await render(
        <PageRenderer
          payload={JSON.stringify({
            bodyMarkdown: "the body",
            title: "initial title",
          })}
        />,
      );

      act(() => handler({ state: JSON.stringify(newProps) }));

      expect(scroll).not.toHaveBeenCalled();
    });
  });
});
