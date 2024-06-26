import fetchMock from "jest-fetch-mock";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Anchor } from "./links";
import * as history from "./History";

jest.mock("./History", () => ({
  history: jest.fn(),
}));

describe("links", () => {
  beforeEach(() => {
    fetchMock.resetMocks();

    jest.mocked(history.history).mockReturnValue({
      pushState: jest.fn(),
      onPushState: jest.fn(),
    });
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
      fetchMock.mockOnce(payload);
      const pushState = jest.fn();
      jest.mocked(history.history).mockReturnValue({
        pushState,
        onPushState: jest.fn(),
      });
      const href = "/here/";
      const { container } = render(<Anchor href={href}>Hi</Anchor>);

      const a = container.querySelector("a");
      if (a) {
        fireEvent.click(a);
      }

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
      fetchMock.mockOnce(payload);
      const pushState = jest.fn();
      jest.mocked(history.history).mockReturnValue({
        pushState,
        onPushState: jest.fn(),
      });
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
