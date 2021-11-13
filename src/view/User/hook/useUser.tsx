import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { userInteractor } from '../../../core/interactors'
import { UserIF } from '../../../interface'
import { GetUse, GetUsersActionsStatistics } from '../../../request/user'

const useUserInit = () => {
  const [behaviorTraces, setBehaviorTraces] = useState({
    total: 0,
    list: []
  })
  const [behavioStatistics, setBehavioStatistics] = useState([])
  const [behavioDetail, setBehavioDetail] = useState({} as any)
  const [activeId, setActiveId] = useState('')
  const [sessionSurvey, setSessionSurvey] = useState<UserIF.User>()
  const params = useParams<'user_id' | 'session_id'>()

  const initSessionBehaviorTrace = useCallback(async page => {
    const { total, user_actions_list } = await userInteractor.getUserActions({
      sessionId: params.session_id,
      page: page,
      limit: 3
    })
    setBehaviorTraces({
      total: total,
      list: user_actions_list
    })
  }, [])

  const handleActiveBehavior = async (item: any) => {
    setActiveId(`${item.happen_time}${item.action_type}`)
    setBehavioDetail(item.action_detail)
  }
  useEffect(() => {
    ;(async () => {
      const { data } = await GetUse(params.user_id)
      const actionsStatistics = await GetUsersActionsStatistics({
        session_id: params.session_id
      })
      setSessionSurvey(data)
      setBehavioStatistics(actionsStatistics.data)
    })()
  }, [params])

  useEffect(() => {
    initSessionBehaviorTrace(1)
  }, [])

  const onPageChange = useCallback(async (page: any) => {
    setBehaviorTraces({
      ...behaviorTraces
    })
    initSessionBehaviorTrace(page)
  }, [])

  return {
    behaviorTraces,
    sessionSurvey,
    activeId,
    behavioStatistics,
    behavioDetail,
    handleActiveBehavior,
    onPageChange
  }
}

export default useUserInit
