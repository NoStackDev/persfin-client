import ActivityCard from "../../Components/ActivityCard"
import FilterBar from "../../Components/FilterBar"
import DistributionChart from "../../Components/Charts/PieChart/DistributionChart.component"

import outflows from "./outflows"

import "./Outflow.style.scss"

type Props = {}

const Outflow = (props: Props) => {
  return (
    <div className="outflow-container">
        <FilterBar />

        <main>
            <section>
                <ActivityCard cardTitle="Outflow" activities={outflows} />
            </section>
            <section>
                <DistributionChart />
            </section>
        </main>
    </div>
  )
}

export default Outflow