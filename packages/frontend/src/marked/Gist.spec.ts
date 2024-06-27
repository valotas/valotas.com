import { parseGist } from "./Gist.js";

describe("Gist", () => {
  describe("parseGist", () => {
    test("is exported", () => {
      expect(parseGist).toBeDefined();
    });

    [
      {
        gist: `<script src="https://gist.github.com/1240545.js?file=CharArrayWriterResponse.java"></script>`,
        expectedId: "1240545",
        expectedUser: "valotas",
        expectedFile: "CharArrayWriterResponse.java",
      },
      {
        gist: `<script src="https://gist.github.com/valotas/09f8fabc1a1db4b108b3.js?file=schedule.js"></script>`,
        expectedId: "09f8fabc1a1db4b108b3",
        expectedUser: "valotas",
        expectedFile: "schedule.js",
      },
      {
        gist: `<script src="https://gist.github.com/666/09f8fabc1a1db4b108b3.js?file=schedule.js"></script>`,
        expectedId: "09f8fabc1a1db4b108b3",
        expectedUser: "666",
        expectedFile: "schedule.js",
      },
    ].forEach(({ gist, expectedId, expectedUser, expectedFile }) => {
      test(`returns gistId: '${expectedId}' for ${gist}`, () => {
        expect(parseGist(gist)?.gistId).toEqual(expectedId);
      });

      test(`returns file: '${expectedFile}' for ${gist}`, () => {
        expect(parseGist(gist)?.file).toEqual(expectedFile);
      });

      test(`returns user: '${expectedUser}' for ${gist}`, () => {
        expect(parseGist(gist)?.user).toEqual(expectedUser);
      });
    });
  });
});
