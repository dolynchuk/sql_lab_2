import React, {Component} from 'react';
import UserEditDialog from 'components/UserEditDialog';
import GroupEditDialog from 'components/GroupEditDialog';
import UsersTable from 'components/UsersTable';
import GroupsTable from 'components/GroupsTable';
import Statistics from 'components/Statistics';

export default class extends Component {
  state = {
    users: [],
    groups: [],
    isUserEditDialogOpen: false,
    isGroupEditDialogOpen: false,
    openUserId: null,
    openGroupId: null,
  };

  handleUserEditDialogClose = () => {
    this.setState({
      isUserEditDialogOpen: false
    })
  };

  handleGroupEditDialogClose = () => {
    this.setState({
      isGroupEditDialogOpen: false
    })
  };

  createUserEditDialogOpen = userId => (
    () => {
      this.setState({
        isUserEditDialogOpen: true,
        openUserId: userId,
      });
    }
  );

  createGroupEditDialogOpen = groupId => (
    () => {
      this.setState({
        isGroupEditDialogOpen: true
      });
      this.setState({
        openGroupId: groupId,
      })
    }
  );

  render(){
    const {
      users,
      groups,
      isUserEditDialogOpen,
      isGroupEditDialogOpen,
      openUserId,
      openGroupId,
    } = this.state;

    return (
      <div>
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto'
          }}
        >
          <Statistics/>
          <UsersTable
            users={users}
            createUserEditDialogOpen={this.createUserEditDialogOpen}
            onUsersChange={users => this.setState({users})}
          />
          <GroupsTable
            groups={groups}
            createGroupEditDialogOpen={this.createGroupEditDialogOpen}
            onGroupsChange={groups => this.setState({groups})}
          />
        </div>
        <UserEditDialog
          open={isUserEditDialogOpen}
          userId={openUserId}
          onClose={this.handleUserEditDialogClose}
          onUsersChange={users => this.setState({users})}
          onGroupsChange={groups => this.setState({groups})}
        />
        <GroupEditDialog
          open={isGroupEditDialogOpen}
          groupId={openGroupId}
          onClose={this.handleGroupEditDialogClose}
          onGroupsChange={groups => this.setState({groups})}
        />
      </div>
    );
  }
}
