/*
 * Copyright 2015 Telefónica I+D
 * All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

'use strict';

var assert = require('assert'),
    path = require('path'),
    init = require('./init'),
    config = require('../../lib/config');


/* jshint unused: false */
suite('config', function () {

    setup(function () {
        var file = path.resolve(__dirname, 'settings.json');
        config.data.settings = file;
        config.data.regions.init(file);
    });


    test('should_return_valid_config', function () {
        //Given
        var filename = path.join(__dirname, 'test_config.yml');

        //When
        var result = config.readConfigFile(filename);

        //Then
        assert.deepEqual(['INFO', 'Read configuration file'], result);
        assert.equal(config.data.logLevel, 'ERROR');
        assert.equal(config.data.webContext, '/');
        assert.notEqual(config.data.idm, undefined);
        assert.notEqual(config.data.mailman, undefined);
        assert.equal(config.data.jenkins.token, '12345678');
        assert.equal(config.data.jenkins.path, '/jenkins/job/fiware_job1');
        assert.equal(config.data.jenkins.parameterName, 'REGION_NAME');
        assert.equal(config.data.default, false);
    });

    test('should_fail_with_invalid_path', function () {
        //Given
        var invalidFilename = path.join(__dirname, 'kk.yml');

        //When
        var result = config.readConfigFile(invalidFilename);

        //Then
        assert.deepEqual(['WARN', 'Could not read configuration file'], result);
    });

});
