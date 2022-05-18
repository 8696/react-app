
// 资产
type AssetType = {
  type: 1,
  name: string
}
// 层
type StoreyType = {
  type: 2
  asset?: {
    assetName: string,
  }
}
// 空
type EmptyAssetType = {
  type: 3
}
const originList: (AssetType | StoreyType | EmptyAssetType)[][] = [
  [
    {
      type: 1,
      name: '一层'
    },
    {
      type: 2,
      asset: {
        assetName: '资产001'
      }
    },
    {
      type: 3
    },
    {
      type: 2,
      asset: {
        assetName: '资产001'
      }
    },
    {
      type: 3
    }
  ]
]
export default originList
