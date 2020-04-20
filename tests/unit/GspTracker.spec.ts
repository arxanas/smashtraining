import { commitRecordGspDatum, makeDefaultRootStore } from "@/store";
import { flagConsoleErrors } from "../utils";

describe("GspTracker.vue", () => {
  const token = flagConsoleErrors();
  beforeEach(token.beforeEach);
  afterEach(token.afterEach);

  it("should autovivify GSP entries", () => {
    const store = makeDefaultRootStore();
    commitRecordGspDatum(store, {
      gameAndCharacterId: {
        gameId: "ssbu",
        characterId: "mario",
      },
      gspDatum: {
        timestamp: 1234,
        gsp: 5678,
      },
    });
    expect(store.state.main.remote.recordedRawGspData).toStrictEqual({
      ssbu: {
        mario: [
          {
            timestamp: 1234,
            gsp: 5678,
          },
        ],
      },
    });

    commitRecordGspDatum(store, {
      gameAndCharacterId: {
        gameId: "ssbu",
        characterId: "mario",
      },
      gspDatum: {
        timestamp: 123,
        gsp: 456,
      },
    });
    expect(store.state.main.remote.recordedRawGspData).toStrictEqual({
      ssbu: {
        mario: [
          {
            timestamp: 1234,
            gsp: 5678,
          },
          {
            timestamp: 123,
            gsp: 456,
          },
        ],
      },
    });
  });
});
