import Skeleton from './Skeleton'

export default function ProductSkeleton() {
  return (
    <div>
      <Skeleton width={'100%'} radius={'0.2rem'} responsive />
      <div className="flex flex-col gap-1 w-full mt-[0.25rem]">
        <div className="flex gap-2 w-full">
          <Skeleton width={'50%'} radius={'0.2rem'} grow>
            상품명
          </Skeleton>
          <Skeleton width={'25%'} radius={'0.2rem'}>
            가격
          </Skeleton>
        </div>
        <Skeleton width={'fit-content'} radius={'0.2rem'}>
          카테고리
        </Skeleton>
      </div>
    </div>
  )
}
