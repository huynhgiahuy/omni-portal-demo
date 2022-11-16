import React from 'react';
import { Breadcrumb, } from 'antd';
import { Link } from 'react-router-dom';
type BreadProps = {
    parentPath?: string;
    parentPathTitle?: string;
    arr?: BreadLink[];
}
type BreadLink = {
    to: string;
    title?: string;
};
const CustomizeBread: React.FC<BreadProps> = ({ parentPath, parentPathTitle, arr }) => {
    return (
        <Breadcrumb style={{ marginBottom: 14 }} separator=">">
            {parentPath && parentPathTitle ? (
                <Breadcrumb.Item>
                    <Link to={parentPath}>{parentPathTitle}</Link>
                </Breadcrumb.Item>
            ) : (
                ''
            )}
            {arr &&
                arr?.map((item: BreadLink) => {
                    if (typeof item === 'object') {
                        return (
                            <Breadcrumb.Item key={item.title}>
                                <Link to={item.to}>{item.title}</Link>
                            </Breadcrumb.Item>
                        );
                    } else {
                        return (
                            <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
                        );
                    }

                })}
        </Breadcrumb>
    )
}

export default CustomizeBread;
