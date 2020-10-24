class MapService {
  static clearNull = map => {
    const data = {};
    Object.keys(map)
      .filter(key => Boolean(map[key]))
      .forEach(key => data[key] = map[key]);

    return data;
  }
}

export default MapService;