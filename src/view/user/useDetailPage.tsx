import React, { FC } from 'react'
import { Card, Pagination } from 'antd'
import './index.less'
import useUserInit from './hook/useUser'
import SessionSurvey from './components/sessionSurvey'
import BehaviorTimeLine from './components/behaviorTraces'
import BehaviorDetail from './components/behaviorDetail'

const UserActionPage: FC = () => {
  const {
    activeId,
    behaviorTraces,
    onPageChange,
    behavioDetail,
    handleActiveBehavior,
    sessionSurvey,
    behavioStatistics
  } = useUserInit()

  return (
    <div className="user__detail_page">
      <SessionSurvey sessionSurvey={sessionSurvey} behavioStatistics={behavioStatistics} />
      <Card title="行为追踪">
        <div className="flex">
          <div className="flex-grow-1 time_lines_warp">
            <BehaviorTimeLine list={behaviorTraces.list} activeId={activeId} activeBehavior={handleActiveBehavior} />
          </div>
          <div className="flex-grow-1 time_line_detail_warp">
            <BehaviorDetail detail={behavioDetail} />
          </div>
        </div>
        <div className="pagination">
          <Pagination onChange={onPageChange} pageSize={3} total={behaviorTraces.total} />
        </div>
      </Card>
    </div>
  )
}

export default UserActionPage
