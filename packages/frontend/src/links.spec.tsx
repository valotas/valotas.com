import fetchMock from "jest-fetch-mock";
import { jest } from "@jest/globals";
import { render, fireEvent, waitFor } from "@testing-library/react";

jest.unstable_mockModule("./History", () => {
  const history = jest.fn();
  return { history };
});

const history = await import("./History.js");
const { Anchor } = await import("./links.js");

describe("links", () => {
  beforeEach(() => {
    fetchMock.default.resetMocks();

    jest.mocked(history.history).mockReturnValue({
      pushState: jest.fn(),
      onPushState: jest.fn(),
    } as any);
  });

  describe("Anchor", () => {
    it("is exported", () => {
      expect(Anchor).toBeDefined();
    });

    it("renders an anchor", () => {
      const { container } = render(<Anchor href="/">Hi</Anchor>);

      const a = container.querySelector("a");

      expect(a).toBeTruthy();
      expect(a?.innerHTML).toBe("Hi");
    });

    it("fetches the meta.json of the given href on click", async () => {
      const { container } = render(<Anchor href="/">Hi</Anchor>);

      const a = container.querySelector("a");
      if (a) {
        fireEvent.click(a);
      }

      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith("/meta.json");
      });
    });

    it("fetches the right meta.json href if it does not end with /", async () => {
      const { container } = render(<Anchor href="/here">Hi</Anchor>);

      const a = container.querySelector("a");
      if (a) {
        fireEvent.click(a);
      }

      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith("/here/meta.json");
      });
    });

    it("pushes the fetched state to history", async () => {
      const payload = "payload";
      fetchMock.default.mockOnce(payload);
      const pushState = jest.fn();
      jest.mocked(history.history).mockReturnValue({
        pushState,
        onPushState: jest.fn(),
      } as any);
      const href = "/here/";
      const { container } = render(<Anchor href={href}>Hi</Anchor>);

      const a = container.querySelector("a");
      fireEvent.click(a!);

      await waitFor(() => {
        expect(pushState).toHaveBeenCalledWith(
          payload,
          expect.any(String),
          href,
        );
      });
    });

    it("pushes an href with an ending / to the history", async () => {
      const payload = "payload";
      fetchMock.default.mockOnce(payload);
      const pushState = jest.fn();
      jest.mocked(history.history).mockReturnValue({
        pushState,
        onPushState: jest.fn(),
      } as any);
      const href = "/here";
      const { container } = render(<Anchor href={href}>Hi</Anchor>);

      const a = container.querySelector("a");
      if (a) {
        fireEvent.click(a);
      }

      await waitFor(() => {
        expect(pushState).toHaveBeenCalledWith(
          payload,
          expect.any(String),
          `${href}/`,
        );
      });
    });
  });
});
