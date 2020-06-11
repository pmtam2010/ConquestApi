import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ApiForm from './ApiForm';

Enzyme.configure({ adapter: new Adapter() });

describe('ApiForm', () => {
    it('should show request id', () => {
        const wrapper = shallow(<ApiForm/>);
        // Set value for request detail
        const txtRequestDetail = wrapper.find("#txtRequestDetail");
        txtRequestDetail.simulate("change", { target: { value: "Request 15 From Tony" } });
        // Set value for request name
        const txtRequestName = wrapper.find("#txtRequestName");
        txtRequestName.simulate("change", { target: { value: "Tony Phan" } });
        // Set value for Org Unit ID
        const orgUnitId = wrapper.find("#txtOrgUnitId");
        orgUnitId.simulate("change", { target: { value: 19 } });
        // Simulate clicking Create button
        const createButton = wrapper.find("#btnCreate");
        createButton.simulate("click");
        // Get request id from hidden label
        const hdRequestId = wrapper.find("#hdRequestId");
        expect(hdRequestId.isEmptyRender()).toBe(false);
    });
    it('should show document id', () => {
        const wrapper = shallow(<ApiForm/>);
        const txtRequestId = wrapper.find("#txtRequestId");
        expect(txtRequestId.isEmptyRender()).toBe(false);
        const btnAttachImage = wrapper.find("#btnAttachImage");
        btnAttachImage.simulate('click');
        const hdDocumentId = wrapper.find("#hdDocumentId");
        expect(hdDocumentId.isEmptyRender()).toBe(false);
    })
});