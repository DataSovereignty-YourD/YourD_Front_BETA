import { Icon } from '@iconify/react';
import { ReactComponent as DepositAmount} from "../../assets/deposit_amount.svg"
const Overview = () => {
  return (
    <div className="Overview">
        Overview
        <section className='OverviewSection'>
            <div className="OverviewBox">
              <div className="Overview_Title">Total User</div>
              <div className="Overview_Num">
                60,549
                <Icon icon="tabler:triangle-filled" color="#4ecb71" style={{marginLeft:"10px"}}/>
              </div>
              <div className="Overview_PreNum">from 54,494</div>
            </div>
            <div className="OverviewBox">
              <div className="Overview_Title">AVG. Click Rate</div>
              <div className="Overview_Num">
                58,691<Icon icon="tabler:triangle-filled" color="#4ecb71" style={{marginLeft:"10px"}}/>
              </div>
              <div className="Overview_PreNum">from 52,521</div>
            </div>
            <div className="OverviewBox">
              <div className="Overview_Title">Ads View</div>
              <div className="Overview_Num">
                50,392
                <Icon icon="carbon:subtract" color="white" />
              </div>
              <div className="Overview_PreNum">from 50,392</div>
            </div>
            <div className='DepositBox' >
            <div className="Overview_Title" style={{paddingBottom:"0rem"}}>Deposit</div>
              <DepositAmount/>
            </div>
        </section>
      </div>
    );
}

export default Overview;