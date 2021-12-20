import { useEffect, useState } from 'react'
import { useFilterHeaderContext } from '../../../components/filterHeader/hook/useFilterHeaderInit'
import { performanceInteractor } from '../../../core/interactors'
import { PerformanceIF } from '../../../interface'

const usePerformanceInit = () => {
  const [quota, setQuota] = useState<PerformanceIF.PerformanceQuota>()
  const { filterHeaderParams } = useFilterHeaderContext()

  const [stackConsumes, setStackConsumes] = useState<any>([])
  const [performances, setPerformances] = useState<PerformanceIF.Performances>([])
  const [performanceConsumes, setPerformanceConsumes] = useState<{
    pv: Array<{
      time: string
      value: number
      type: string
    }>
    timeConsumes: Array<{
      time: string
      count: number
      name: string
    }>
  }>({
    pv: [],
    timeConsumes: []
  })

  useEffect(() => {
    ;(async () => {
      const stackConsumes = await performanceInteractor.getPerformanceStack(filterHeaderParams)
      setStackConsumes(stackConsumes)
      const performanceConsumes = await performanceInteractor.getPerformanceStageTime(filterHeaderParams)
      setPerformanceConsumes(performanceConsumes)
      const quota = await performanceInteractor.getQuotaData(filterHeaderParams)
      setQuota(quota)
      const performances = await performanceInteractor.getPerformancePages(filterHeaderParams)
      setPerformances(performances)
    })()
  }, [filterHeaderParams])

  return { quota, stackConsumes, performanceConsumes, performances }
}

export default usePerformanceInit
