// EmployeeCard.tsx
import Image from 'next/image';
import React from 'react';
import "./viewSwitch.scss";
import ListIcon from '../../../public/icons/list-solid.svg'
import GridIcon from '../../../public/icons/table-cells-solid.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { settingsSlice } from '../../store/slices/settings-slice';

const ViewSwitch: React.FC = () => {
    const dispatch = useAppDispatch();

    const viewMode = useAppSelector(state => state.settings.viewMode);

    function changeView(mode: string) {
        dispatch(settingsSlice.actions.setMode(mode));
    }

    return (
        <div className="button-view">
            {(viewMode === "grid") ? <button className="img-icon-btn" onClick={() => changeView("table")}>
                <ListIcon className="img-icon" height={20} width={20}></ListIcon>
            </button> :
                <button className="img-icon-btn" onClick={() => changeView("grid")}>
                    <GridIcon className="img-icon" height={20} width={20}></GridIcon>
                </button>
            }
        </div>
    );
};

export default ViewSwitch;

