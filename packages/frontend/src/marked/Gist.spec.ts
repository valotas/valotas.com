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
        gist: `https://gist.github.com/1240545.js?file=CharArrayWriterResponse.java`,
        srcOnly: true,
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
        gist: `https://gist.github.com/valotas/09f8fabc1a1db4b108b3.js?file=schedule.js`,
        srcOnly: true,
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
      {
        gist: `https://gist.github.com/666/09f8fabc1a1db4b108b3.js?file=schedule.js`,
        srcOnly: true,
        expectedId: "09f8fabc1a1db4b108b3",
        expectedUser: "666",
        expectedFile: "schedule.js",
      },
    ].forEach(({ gist, srcOnly, expectedId, expectedUser, expectedFile }) => {
      test(`returns gistId: '${expectedId}' for ${gist}`, () => {
        expect(parseGist(gist, srcOnly)?.gistId).toEqual(expectedId);
      });

      test(`returns file: '${expectedFile}' for ${gist}`, () => {
        expect(parseGist(gist, srcOnly)?.file).toEqual(expectedFile);
      });

      test(`returns user: '${expectedUser}' for ${gist}`, () => {
        expect(parseGist(gist, srcOnly)?.user).toEqual(expectedUser);
      });
    });
  });
});
