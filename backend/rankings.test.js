const {PostMatch, GetMatch, GetMatches} = require("./matches");

describe("Match recording", () => {
  test("Adding a match succesfully returns the created match with an assigned id", () => {
    const params = {
      "players": ["Potato", "Tomato"],
      "results": [1,0],
    };
    const res = {json: jest.fn()};
    PostMatch({body: params}, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({...params, id: expect.any(Number)}));
  });

  test("Adding a match without players returns an error", () => {
    const params = {
      "results": [1,0],
    };
    const res = {send: jest.fn(), status: jest.fn()};
    PostMatch({body: params}, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Bad Request");
  });

  test("Adding a match without results returns an error", () => {
    const params = {
      "players": ["Potato", "Tomato"],
    };
    const res = {send: jest.fn(), status: jest.fn()};
    PostMatch({body: params}, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Bad Request");
  });
  
  test("Adding a match succesfully allows fetching it with the assigned id", () => {
    const body = {
      "players": ["Potato", "Tomato"],
      "results": [1,0],
    };
    const res = {json: jest.fn()};
    PostMatch({body}, res);

    const id = res.json.mock.calls[0][0].id;

    expect(id).toEqual(expect.any(Number));

    const res2 = {json: jest.fn()};
    GetMatch({params: {id}}, res2);

    expect(res2.json).toHaveBeenCalledWith(expect.objectContaining(body));
  });

  
  test("Adding a match succesfully allows seeing it in the full match list", () => {
    const body = {
      "players": ["PotatoWeird", "TomatoWeird"],
      "results": [91231,123897129831],
    };
    const res = {json: jest.fn()};
    PostMatch({body}, res);

    const id = res.json.mock.calls[0][0].id;

    expect(id).toEqual(expect.any(Number));

    const res2 = {json: jest.fn()};
    GetMatches(null, res2);

    expect(res2.json).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining(body)]));
  });
});
