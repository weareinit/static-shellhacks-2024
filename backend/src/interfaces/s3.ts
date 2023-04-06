export interface BucketParams {
  Bucket: string
  Key: string
  Body?: Buffer
  ContentType?: string
}

export interface SignedUrl {
  url: string
}
