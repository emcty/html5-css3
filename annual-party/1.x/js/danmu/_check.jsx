
/**
 * 模拟 websokcet 链接建立了 测试用
 * @constructor
 */
function GoEasy(){}

GoEasy.prototype.subscribe = function(canshu){
    setInterval(function(){
        canshu.onMessage({
            id:1,
            text:"弹幕测试发射器哈哈哈"
        })
    },1000)
}

/**
 * end
 */

var goEasy = new GoEasy({
    appkey: options.appkey
});

var DanmuList = React.createClass({
    componentDidMount:function(){
        goEasy.subscribe({
            channel: "test",
            onMessage:this.onMsg
        });
    },
    onMsg:function(message){
        this.setState({
            message:message
        })
    },
    render:function(){
        return (
            <ul className="container">
                {
                    this.state.message.map(function(child){
                        return child;
                    })
                }
            </ul>
        )
    }
});


var Buttons = React.createClass({
    render:function(){
        return (
            <a href="#">按钮</a>
        )
    }
});

var Container = React.createClass({

    render:function(){
        return (
            <div>
                <DanmuList />
                <Buttons />
            </div>
        )
    }
});

ReactDOM.render(
    <Container />,
    document.getElementById("container")
);
