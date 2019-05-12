import React, { Fragment } from 'react';
import LoadingIndicator from '../common/LoadingIndicator';
import {withTranslation} from 'react-i18next';

const fetchOnSroll = (Component) => {
     class FetchOnScroll extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                page: 1
            }
            if (this.props.singerId)
                this.props.fetchData(this.state.page, this.props.func, this.props.singerId);
            else
                this.props.fetchData(this.state.page, this.props.func)
        }
        componentDidMount() {
            window.addEventListener('scroll', this.onSroll, false);
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.onSroll, false);
            this.props.wipeData(this.props.wipeFunc);

        }

        componentDidUpdate = async (prevProps) => {
            if (prevProps.singerId !== this.props.singerId) {
                if (this.props.singerId) {
                    await this.setState({
                        page: 1
                    })
                    this.props.wipeData(this.props.wipeFunc);
                    this.props.fetchData(this.state.page, this.props.func, this.props.singerId);
                }
                else
                    this.props.fetchData(this.state.page, this.props.func)
            }
        }

        onSroll = async () => {
            if (
                (window.scrollY - (document.body.offsetHeight * (this.state.page - 1))) >= 191
            ) {
                await this.setState({
                    page: this.state.page + 1
                })
                if (this.props.singerId)
                    this.props.fetchData(this.state.page, this.props.func, this.props.singerId);
                else
                    this.props.fetchData(this.state.page, this.props.func)
            }
        }

        render() {
            let { data,t, ...rest } = this.props;
            return (
                <Fragment >
                    {data.list.length === 0 ?
                        <div style={{ marginLeft: '45%' }}>{t('nosongs')}</div> :
                        <Component list={data.list} {...rest} />}
                    <LoadingIndicator height={100} width={100} isGetting={data.isGetting} />
                </Fragment>
            )
        }
    }
    return withTranslation('common')(FetchOnScroll);
}

export default fetchOnSroll;