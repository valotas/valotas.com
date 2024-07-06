import fetchMock from "jest-fetch-mock";
import { render, waitFor } from "./testing.js";
import { useFetch } from "./AsyncContext.js";

function UseFetchTester({ url }: { url: string }) {
  const { content, loading } = useFetch(url);

  return <div className={`loading-${loading}`}>{content}</div>;
}

describe("AsyncContext", () => {
  beforeEach(() => {
    fetchMock.default.resetMocks();
  });

  describe("useFetch", () => {
    it("does a fetch request", async () => {
      const url = "/url/to/be/fetched";
      render(<UseFetchTester url={url} />);

      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith(url);
      });
    });

    it("it returns { loading: true } while response is not done", async () => {
      const url = "/url/to/be/fetched/2";
      //eslint-disable-next-line
      fetchMock.default.mockReturnValue(new Promise((_) => {}));

      const { container } = render(<UseFetchTester url={url} />);

      await waitFor(() => {
        expect(container.querySelector(".loading-true")).toBeTruthy();
      });
    });

    it("it returns { loading: false, content } when response is done", async () => {
      const url = "/url/to/be/fetched/3";
      const content = "this is the content";
      fetchMock.default.mockOnce(content);

      const { container } = render(<UseFetchTester url={url} />);

      await waitFor(() => {
        const div = container.querySelector(".loading-false");
        expect(div).toBeTruthy();
        expect(div?.innerHTML).toBe(content);
      });
    });

    it("does only one fetch request per url", async () => {
      const url = "/another/url/to/be/fetched";

      const { rerender } = render(<UseFetchTester url={url} />);
      rerender(<UseFetchTester url={url} />);

      await waitFor(() => {
        expect(fetchMock).toBeCalledTimes(1);
      });
    });
  });
});
