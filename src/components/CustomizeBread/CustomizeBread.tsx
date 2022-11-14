import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

type BreadProps = {
    parentPath: string;
    parentPathTitle: string;
    arr: string[];
}

const CustomizeBread: React.FC<BreadProps> = (props) => (
    <Breadcrumb style={{ marginBottom: 14 }} separator=">">
        {props.parentPath && props.parentPathTitle ? (
            <Breadcrumb.Item>
                <Link to={props.parentPath}>{props.parentPathTitle}</Link>
            </Breadcrumb.Item>
        ) : (
            ''
        )}
        {props.arr &&
            props.arr?.map(item => (
                <>
                    <Breadcrumb.Item>{item}</Breadcrumb.Item>
                </>
            ))}
    </Breadcrumb>

)
export default CustomizeBread;