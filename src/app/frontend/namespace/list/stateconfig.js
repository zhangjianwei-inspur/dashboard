// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {stateName as parentStateName} from '../../cluster/state';
import {breadcrumbsConfig} from '../../common/components/breadcrumbs/service';

import {stateName as parentState, stateUrl} from '../state';
import {NamespaceListController} from './controller';

/**
 * I18n object that defines strings for translation used in this file.
 */
const i18n = {
  /** @type {string} @desc Label 'Namespaces' that appears as a breadcrumbs on the action bar. */
  MSG_BREADCRUMBS_NAMESPACES_LABEL: goog.getMsg('Namespaces'),
};

/**
 * Config state object for the Namespace list view.
 *
 * @type {!ui.router.StateConfig}
 */
export const config = {
  url: stateUrl,
  parent: parentState,
  resolve: {
    'namespaceList': resolveNamespaceList,
  },
  data: {
    [breadcrumbsConfig]: {
      'label': i18n.MSG_BREADCRUMBS_NAMESPACES_LABEL,
      'parent': parentStateName,
    },
  },
  views: {
    '': {
      controller: NamespaceListController,
      controllerAs: '$ctrl',
      templateUrl: 'namespace/list/list.html',
    },
  },
};

/**
 * @param {!angular.$resource} $resource
 * @return {!angular.Resource}
 * @ngInject
 */
export function namespaceListResource($resource) {
  return $resource('api/v1/namespace');
}

/**
 * @param {!angular.Resource} kdNamespaceListResource
 * @param {!./../../common/dataselect/service.DataSelectService} kdDataSelectService
 * @return {!angular.$q.Promise}
 * @ngInject
 */
export function resolveNamespaceList(kdNamespaceListResource, kdDataSelectService) {
  let query = kdDataSelectService.getDefaultResourceQuery('');
  return kdNamespaceListResource.get(query).$promise;
}
