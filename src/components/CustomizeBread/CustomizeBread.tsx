import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

type Arr = {
    to: string;
    title: string;
}[]
type BreadProps = {
    parentPath: string;
    parentPathTitle: string;
    arr: Arr;
    to: string;
    title: string;
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
            props.arr?.map(item => {
                if (typeof item === 'object') {
                    return (
                        <Breadcrumb.Item key={item.title}>
                            <Link to={item.to}>{item.title}</Link>
                        </Breadcrumb.Item>
                    );
                } else {
                    return (
                        <>
                            <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
                        </>
                    );
                }
            })}
    </Breadcrumb>

)
export default CustomizeBread;