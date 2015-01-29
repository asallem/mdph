'use strict';

describe('Service: isAdult', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  // instantiate service
  var isAdult;
  beforeEach(inject(function (_isAdult_) {
    isAdult = _isAdult_;
  }));

  it('should return true because the date is more than 20 years ago', function () {
    var contexte = {dateNaissance: new Date(1983,11,7)};
    expect(isAdult(contexte)).toBe(true);
  });

  it('should return true because the date is more than 20 years ago', function () {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 20);
    var contexte = {dateNaissance: date};
    expect(isAdult(contexte)).toBe(true);
  });

  it('should return false because the date is less than 20 years ago', function () {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 19);
    var contexte = {dateNaissance: date};
    expect(isAdult(contexte)).toBe(false);
  });

  it('should return false because the date is less than 20 years ago', function () {
    var contexte = {dateNaissance: new Date(2014,1,1)};
    expect(isAdult(contexte)).toBe(false);
  });

});

describe('Service: isActive', function () {

  // load the service's module
  beforeEach(module('impactApp'));

  // instantiate service
  var isLessThan62;
  beforeEach(inject(function (_isLessThan62_) {
    isLessThan62 = _isLessThan62_;
  }));

  it('should return true because the date is less than 62 years ago', function () {
    var contexte = {dateNaissance: new Date(1983,11,7)};
    expect(isLessThan62(contexte)).toBe(true);
  });

  it('should return true because the date is exactly 61 years ago', function () {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 61);
    var contexte = {dateNaissance: date};
    expect(isLessThan62(contexte)).toBe(true);
  });

  it('should return false because the date is exactly 62 years ago', function () {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 62);
    var contexte = {dateNaissance: date};
    expect(isLessThan62(contexte)).toBe(false);
  });

  it('should return false because the date is more than 62 years ago', function () {
    var contexte = {dateNaissance: new Date(1945,1,1)};
    expect(isLessThan62(contexte)).toBe(false);
  });

});
