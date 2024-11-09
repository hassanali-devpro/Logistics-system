const getLevelLocations = (locations: any[], level: string) => {
  return locations.filter((location) => location.row_number === level)
}

export const parseBay = (bay: any): any => {
  return {
    ...bay,
    levelsArray: Array.from({ length: bay.levels }, (_, levelIndex) => ({
      width: bay.width,
      length: bay.length,
      height: bay.rowSpaces[levelIndex + 1] - bay.rowSpaces[levelIndex],
      id: levelIndex + 1,
      name: `Level ${String.fromCharCode(65 + levelIndex)}`, // 'A', 'B', 'C', etc.
      locationsArray: getLevelLocations(bay.bayLocations, String.fromCharCode(65 + levelIndex)).map(
        (location, locIndex) => ({
          ...location,
          width: location.depth,
          length: location.width,
          id: locIndex + 1,
          name: `${location.row_number}${location.column_number}` // 'A1', 'A2', etc.
        })
      )
    }))
  }
}

export const parseRack = (rack: any): any => {
  return {
    ...rack,
    bays: rack.bays.map((bay: any) => parseBay(bay))
  }
}

export const parseRacks = (racks: any[]): any[] => {
  return racks.map((rack) => parseRack(rack))
}

export const getAngleFromOrientations = (reverse_orientation: boolean, vertical: boolean): number => {
  if (vertical) {
    return reverse_orientation ? 270 : 90
  } else {
    return reverse_orientation ? 180 : 0
  }
}

export const mapEditComponentToZone = (component: any) => ({
  ...component,
  xPoint: component.startX / 1000,
  yPoint: component.startY / 1000,
  width: component.width / 1000,
  depth: component.hight / 1000
})

export const mapZoneToDynaMakerComponent = (zone: any) => ({
  ...zone,
  hight: zone.depth * 1000,
  startX: zone.xPoint * 1000,
  startY: zone.yPoint * 1000,
  width: zone.width * 1000
})
