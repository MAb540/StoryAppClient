import React,{useState,useEffect} from 'react'

function Tabs(props) {

    // const {tabs} = props.data;

    const [tabs, setTabs] = useState(null);
    const [active, setActiveTab] = useState(null);

    useEffect(() => {
        const {data} = props;
        const activeTab = data.find(tab => tab.state === 'active');
        setTabs(data);
        setActiveTab(activeTab.id);

    }, [props])

    const handleClick = (e,currentTab)=>{
        //console.log(currentTab);

        const newTabs = tabs;
        newTabs.forEach((tab,i) => {
            newTabs[i].state =  tab.id ===  currentTab.id ? 'active' : 'inactive'; 
        });

        setTabs(newTabs);
        setActiveTab(currentTab.id);
    }

    const renderTab = ()=>{
        return <ul>
        {tabs.map((tab,index)=> <li key={index}>
            <button className={`${tab.state}`}  onClick={e => handleClick(e,tab)} >{tab.name}</button>
            </li>)}
        </ul>
    }

    return (
        <React.Fragment>
            <div className="author-box-list">
                {
                    tabs && renderTab()
                }
            </div>
            
            <div className="container">
                {tabs && tabs[active-1].content()}
            </div>

        </React.Fragment>

    )
}

export default Tabs
