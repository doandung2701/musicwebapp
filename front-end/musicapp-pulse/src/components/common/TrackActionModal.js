import React from 'react'
import { history, getSongName, downloadSong } from '../../helpers/helper';
import { Modal, Select, Form } from 'antd';
import { withTranslation } from 'react-i18next';

class TrackActionModal extends React.Component {

    state = {
        visible: false,
        playListIds: [],
    }

    openModal = () => {
        let pathname = window.location.pathname;
        if (!this.props.authenticated) {
            if (window.confirm("Please login to use this feature")) {
                sessionStorage.setItem('from', pathname);
                history.push("/signin");
            }
        } else {
            this.setState({
                visible: true
            })
        }
    }

    closeModal = () => {
        this.setState({
            visible: false
        })
    }

    onAddToPlayList = () => {

        this.props.addSongsToPlayLists({
            playlistIds: this.state.playListIds,
            songId: this.props.songIds
        })

    }

    onSelectChange = (value) => {
        this.setState({
            playListIds: value
        })
    }

    onRemove = () => {
        if (window.confirm(this.props.t('common:sure')))
            this.props.removeSongsFromPlaylist({
                playlistIds: [this.props.playlistId],
                songId: this.props.songIds
            })
    }

    renderAddRemoveBtn = () => {
        if (this.props.isInList) {
            return (
                <span className="dropdown-item" onClick={this.onRemove}>
                    <i className={`fa fa-trash fa-fw text-left`}>
                    </i> {this.props.t('common:remove')}
                </span>
            )
        } else {
            return (
                <span className="dropdown-item" onClick={this.openModal}>
                    <i className='fa fa-music fa-fw text-left'>
                    </i> {this.props.t('addtopp')}
                </span>
            )
        }
    }

    downloadSongs = async (srcs) => {
        let pathname = window.location.pathname;
        if (!this.props.authenticated) {
            if (window.confirm("Please login to use this feature")) {
                sessionStorage.setItem('from', pathname);
                history.push("/signin");
            }
        } else {
            for (let src of srcs) {
                await window.open(downloadSong(getSongName(src)));
            }
        }
    }

    render() {
        let { onAddToQueue, playLists, t, isInList } = this.props;
        return (
            <div className="dropdown-menu pull-right black lt">
                <span className="dropdown-item" onClick={onAddToQueue}>
                    <i className="fa fa-plus fa-fw text-left"></i>
                    {t('addtoqueue')}</span>
                {this.renderAddRemoveBtn()}
                <div className="dropdown-divider"></div>
                <span className="dropdown-item" onClick={() => this.downloadSongs(this.props.songSrcs)}>
                    <i className="fa fa-download fa-fw text-left"></i> {t('common:download')}
                </span>
                <Modal title={t('select')} onOk={this.onAddToPlayList}
                    cancelText={t('common:cancel')}
                    onCancel={this.closeModal}
                    visible={this.state.visible}>
                    <Form>
                        <Form.Item>
                            <h6>{t('common:playlists')}:</h6>
                            <Select onChange={this.onSelectChange}
                                placeholder={t('selectplaceholder')}
                                mode="multiple">
                                {playLists.map(value => (
                                    <Select.Option key={value.id}
                                        value={value.id}>{value.name}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default withTranslation(['track', 'common'])(TrackActionModal);