// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import palette from 'google-palette'

export function getColors(cluster_list: number[][]) {
  const color_list: string[] = []
  palette('rainbow', cluster_list.length, 0, 0.5, 0.95)
    .forEach((color: string, i: number) => {
      return color_list.push(...Array.from({ length: cluster_list[i].length }, () => color))
    })
  return color_list
}
