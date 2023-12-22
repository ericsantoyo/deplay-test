import React from 'react';
import TeamLineup from './path/to/TeamLineup'; // Adjust the import path accordingly

export default {
  title: 'Team/TeamLineup',
  component: TeamLineup,
};

const Template = (args) => <TeamLineup {...args} />;

export const DefaultView = Template.bind({});

DefaultView.args = {
  teamselected: "Dummy Team",
  teamPlayers: Array.from({ length: 11 }, (_, index) => ({
    playerData: {
      playerID: `dummy-${index}`,
      image: '/path/to/dummy/image.png', // Ensure this path points to a valid image
      name: `Dummy Player ${index + 1}`,
      nickname: `DP${index + 1}`,
      position: 'Position',
      points: index
    }
  })),
  // Add other props that TeamLineup needs
};
