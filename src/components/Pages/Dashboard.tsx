import 'scss/Dashboard.scss'

import { useAuth } from 'components/Auth/AuthContext'

import Widget from "components/UI/Widget"
import PointsCard from "components/Widgets/PointsCard"
import RaceCard from "components/Widgets/RaceCard"
import TeamCard from "components/Widgets/TeamCard"
import ButtonCard from 'components/Widgets/ButtonCard'
import { useApp } from 'components/App/AppContext'
import { GET_CONFIG } from 'components/queries'
import { useQuery } from '@apollo/client'

const Dashboard = () => {

    const authContext = useAuth();
    const appContext = useApp();

    const {loading, error, data } = useQuery(GET_CONFIG, {
        variables: {
            configId: '1'
        },
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true
    });

    if(!loading && !error) {
        console.log('Configs: ', data?.config);
        appContext.setConfigValue(data?.config)
    }

    return (
        <div className='dark:text-white'>
            <section>
                <p className='size-24'>
                    <span>Ciao </span>
                    <span id="firstname">{authContext.user?.firstname || ''} </span>
                    <span id="lastname">{authContext.user?.lastname || ''} </span> 
                    <span>🏍️</span>
                </p>
                <p className="size-20">Controlla la tua Dashboard</p>
            </section>
            <section className="margin-32">
                <div className="space-content">
                    <div className="grid small-grid-1 medium-grid-2 large-grid-3 equal-height">
                        <Widget bgColor="red">
                        {/* <div className="schiera-button">
                            <h5 style="font-size: 49px"><em>Schiera!</em></h5>
                        </div> */}
                            <ButtonCard />
                        </Widget>
                        <Widget title="Team">
                            <TeamCard />
                        </Widget>
                        <Widget title="Punti">
                            <PointsCard/>
                        </Widget>
                        <Widget>
                            <RaceCard />
                        </Widget>
                    </div>

                {/* <DisplayCalendar client:only />
                <div className="grid small-grid-1 medium-grid-2 large-grid-3 equal-height">
                    <DashboardWidget />
                    <DashboardWidget number="+33" title="Products sold" />
                    <DashboardWidget number="-120" title="Images deleted" type="error" />
                    <div class="radius-large space-96" style="border: 4px dashed grey;">
                    </div>
                    <div class="radius-large space-96" style="border: 4px dashed grey;">
                    </div>
                    <div class="radius-large space-96" style="border: 4px dashed grey;">
                    </div>
                    <div class="radius-large space-96" style="border: 4px dashed grey;">
                    </div>
                    <div class="radius-large space-96" style="border: 4px dashed grey;">
                    </div>
                    <div class="radius-large space-96" style="border: 4px dashed grey;">
                    </div>
                    <div class="radius-large space-96" style="border: 4px dashed grey;">
                    </div>
                    <div class="radius-large space-96" style="border: 4px dashed grey;">
                    </div>
                    <div class="radius-large space-96" style="border: 4px dashed grey;">
                    </div>
                </div> */}
                </div>
            </section>
        </div>
    )
}

export default Dashboard