"use client"

import React, { useState } from 'react';
import SpinnerIcon from '../../../public/icons/trash-can-solid.svg'
import Image from 'next/image';

interface SpinnerProps {
    show: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ show }) => {
    return show ? (
        <div className="mx-auto">
            <Image
                className="mx-auto"
                src="/icons/loading.gif"
                width={50}
                height={50}
                alt="spinner"
            />
        </div>
    ) : null;
};

export default Spinner;
