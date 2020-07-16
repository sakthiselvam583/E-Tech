import { Component } from "react";
import CmsContent from '../MiddleWare/CmsContent';

class PurelyTesting extends Component {
    async componentDidMount() {
        try {
            const { data } = await CmsContent.testRedis();
            if (data) { 
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    render() { 
        return 'render';
    }
}
 
export default PurelyTesting;